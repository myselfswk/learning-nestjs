import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

describe('AuthenticationsController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationsService],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});