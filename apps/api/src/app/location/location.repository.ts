import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from './../entities/configuration/location.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  private logger = new Logger(LocationRepository.name);

  async getListsParent(parentId: number): Promise<Location[]> {
    return await this.find({
      where: {
        parentId,
      },
    });
  }

  async getLocations(search: string) {
    const query = this.createQueryBuilder('Location');
    query.where('location.description LIKE :search', { search: `%${search}%` });
    try {
      const locations = await query.getMany();
      return locations;
    } catch (error) {
      this.logger.error(
        `Failed to get locations, filter: ${search}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to get locations');
    }
  }
}
