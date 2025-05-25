// src/trustee/trustee.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trustee } from './entities/trustee.entity';
import { User } from '@/user/entities/user.entity'; // Assuming User entity path
import { TrustMode, TrustStatus } from './enum/trust.enum'; // Assuming enums path

// DTO for creating a new trust relationship (optional, but good practice)
export class CreateTrusteeDto {
  trustorId: number;
  trusteeId: number;
  maxSingleTransaction: number;
  monthlyLimit: number;
  mode: TrustMode;
  note?: string;
  interestRate?: number;
}

@Injectable()
export class TrusteeService {
  constructor(
    @InjectRepository(Trustee)
    private trusteeRepository: Repository<Trustee>,
    @InjectRepository(User) // Inject User repository to validate user existence
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new trustee relationship.
   * @param createTrusteeDto Data to create the trustee relationship.
   * @returns The newly created Trustee entity.
   */
  async createTrustee(createTrusteeDto: CreateTrusteeDto): Promise<Trustee> {
    try {
      const { trustorId, trusteeId, maxSingleTransaction, monthlyLimit, mode, note, interestRate } = createTrusteeDto;

      // Ensure trustor and trustee are different users
      if (trustorId === trusteeId) {
        throw new BadRequestException('A user cannot establish a trust relationship with themselves.');
      }

      // Check if both users exist
      const trustor = await this.userRepository.findOne({ where: { id: trustorId } });
      const trustee = await this.userRepository.findOne({ where: { id: trusteeId } });

      if (!trustor) {
        throw new NotFoundException(`Trustor with ID ${trustorId} not found.`);
      }
      if (!trustee) {
        throw new NotFoundException(`Trustee with ID ${trusteeId} not found.`);
      }

      // Check if a similar trust relationship already exists and is pending
      const existingTrust = await this.trusteeRepository.findOne({
        where: { trustorId, trusteeId, status: TrustStatus.PENDING },
      });

      if (existingTrust) {
        throw new BadRequestException('A trust relationship between these two users is pending.');
      }

      const newTrustee = this.trusteeRepository.create({
        trustorId,
        trusteeId,
        maxSingleTransaction,
        monthlyLimit,
        mode,
        note,
        interestRate: interestRate || 0.00, // Default to 0 if not provided
        status: TrustStatus.PENDING, // New relationships typically start as PENDING
      });

      return this.trusteeRepository.save(newTrustee);
    } catch (error) {
      // Re-throw specific exceptions (BadRequestException, NotFoundException)
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      // Catch any other unexpected errors during database operations
      throw new InternalServerErrorException('Failed to create trustee relationship.', error.message);
    }
  }

  /**
   * Fetches all trustee relationships.
   * Optionally, filter by trustorId or trusteeId.
   * @param filterOptions Optional object to filter by trustorId or trusteeId.
   * @returns An array of Trustee entities.
   */
  async findAllTrustees(filterOptions?: { trustorId?: number; trusteeId?: number }): Promise<Trustee[]> {
    try {
      const findOptions: any = {
        relations: ['trustor', 'trustee'], // Eager load related User entities
      };

      if (filterOptions?.trustorId) {
        findOptions.where = { ...findOptions.where, trustorId: filterOptions.trustorId };
      }
      if (filterOptions?.trusteeId) {
        findOptions.where = { ...findOptions.where, trusteeId: filterOptions.trusteeId };
      }

      return this.trusteeRepository.find(findOptions);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve trustee relationships.', error.message);
    }
  }

  /**
   * Fetches a single trustee relationship by its ID.
   * @param id The ID of the trustee relationship to fetch.
   * @returns The Trustee entity, or null if not found.
   */
  async findOneTrustee(id: number): Promise<Trustee | null> {
    try {
      const trustee = await this.trusteeRepository.findOne({
        where: { id },
        relations: ['trustor', 'trustee'], // Eager load related User entities
      });

      if (!trustee) {
        throw new NotFoundException(`Trustee relationship with ID ${id} not found.`);
      }
      return trustee;
    } catch (error) {
        throw error;
    }
  }

  /**
   * Finds a specific trust relationship between two users.
   * @param trustorId The ID of the trustor.
   * @param trusteeId The ID of the trustee.
   * @returns The Trustee entity, or null if not found.
   */
  async findTrustRelationship(trustorId: number, trusteeId: number): Promise<Trustee | null> {
    try {
      const trust = await this.trusteeRepository.findOne({
        where: { trustorId, trusteeId },
        relations: ['trustor', 'trustee'],
      });
      return trust;
    } catch (error) {
        throw error;
    }
  }

  // Example of how to update a trustee relationship (e.g., change mode or status)
  async updateTrustee(id: number, updateData: Partial<Trustee>): Promise<Trustee> {
    try {
      const trustee = await this.findOneTrustee(id); // Use the existing find method to ensure it exists

      if (!trustee) {
        throw new NotFoundException(`Trustee relationship with ID ${id} not found.`);
      }

      // Merge the update data into the existing trustee object
      Object.assign(trustee, updateData);

      return this.trusteeRepository.save(trustee);
    } catch (error) {
        throw error;
    }
  }

  // Example of how to delete a trustee relationship
  async deleteTrustee(id: number): Promise<void> {
    try {
      const result = await this.trusteeRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Trustee relationship with ID ${id} not found.`);
      }
    } catch (error) {
        throw error;
    }
  }
}
