import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { DatabaseService } from '@/database/database.service';
import { SignInAuthDto, SignUpAuthDto } from '@/auth/dto';
import {
  CreatePropertyDto,
  PaymentDto,
  PropertyTypeDto,
  TenantDto,
} from '@/properties/dto';
import { VisitationDto } from '@/users/dto/visit.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    if (process.env.NODE_ENV == 'test') {
      app.listen(3080);
    }
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  afterAll(() => {
    dbConnection.collection('properties').deleteMany({});
    dbConnection.collection('users').deleteMany({});
    app.close();
  });

  describe('Authentication', () => {
    describe('SignUp', () => {
      const signUpDto: SignUpAuthDto = {
        email: 'messy@gmail.com',
        firstname: 'messy',
        lastname: 'wambua',
        ID: 36430147,
        phone_number: '254728455643',
        password: 'messyHunter',
      };

      it('should signUp', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/auth/signup')
          .withBody(signUpDto)
          .expectStatus(200);
      });
    });

    describe('SignIn', () => {
      const signInDto: SignInAuthDto = {
        email: 'messy@gmail.com',
        password: 'messyHunter',
      };

      it('should sign', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/auth/signin')
          .withBody(signInDto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('Property', () => {
    describe('create listing', () => {
      const createPropertyDto: CreatePropertyDto = {
        name: 'Exectuive Apartment',
        ownerId: 36430147,
        type: 'rental',
        location: 'Juja',
        description: 'two bedroom at the heart of juja town',
        amenities: [],
        price: 2500,
      };
      it('should create listing', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/properties/create_listing')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(createPropertyDto)
          .stores('propertyID', '_id')
          .expectStatus(201);
      });
    });

    describe('find property by type', () => {
      const findByTypeDto: PropertyTypeDto = {
        type: 'rental',
      };
      it('should return properties by type', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/properties/type')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(findByTypeDto)
          .expectStatus(200);
      });
    });

    describe('book property', () => {
      const tenantDto: TenantDto = {
        _id: 'dsd',
        id: 36430147,
        name: 'Wambua Musalu',
        current: true,
      };

      const visitationDto: VisitationDto = {
        property_Id: 'herokiu',
        time: '4am saturday',
        ID: 36430147,
        email: 'meesy@occupyIt.com',
        name: 'messy wambua',
      };

      it('should book property', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/properties/book')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...tenantDto,
            _id: '$S{propertyID}',
          })
          .expectStatus(201);
      });

      it('should book property visitation', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/user/visitation')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...visitationDto,
            property_Id: '$S{propertyID}',
          })
          .expectStatus(201);
      });
    });

    describe('get tenant info', () => {
      it('should get tenant info', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/properties/tenant_info')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{propertyID}' })
          .expectStatus(200);
      });
    });

    describe('view property visitations', () => {
      it('Should get proerty visitations', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/properties/visitations')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{propertyID}' })
          .expectStatus(200);
      });
    });

    describe('makepayments', () => {
      const paymentDto: PaymentDto = {
        property_Id: 'string',
        tenantId: 36430147,
        paymentMode: 'Mpesa',
        payment: 25500,
        paymentFor: 'deposit',
        duration: 'June, 2022',
      };

      it('should make payment', () => {
        return pactum
          .spec()
          .post('http://localhost:3080/properties/payment')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...paymentDto,
            property_Id: '$S{propertyID}',
          })
          .expectStatus(201);
      });

      it('should get payment info', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/properties/view_payments')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ id: '$S{propertyID}' })
          .expectStatus(200);
      });
    });
  });

  describe('Landowner', () => {
    describe('should register landowner', () => {
      it('it should update', () => {
        return pactum
          .spec()
          .patch('http://localhost:3080/owners/registration')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ ID: 36430147 })
          .expectStatus(200);
      });
    });

    describe('should get owner properties', () => {
      it('should return user properties', () => {
        return pactum
          .spec()
          .get('http://localhost:3080/owners/view_properties')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({ ID: 36430147 })
          .inspect();
      });
    });
  });
});
