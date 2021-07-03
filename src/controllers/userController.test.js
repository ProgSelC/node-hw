jest.mock('../services/userService', () => (function UserService() { }));

const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/userService');
const userController = require('./userController');

const mockUsers = [
    {
        id: '1',
        login: 'Larry',
        password: 'password1',
        age: 25
    },
    {
        id: '2',
        login: 'Leo',
        password: 'password2',
        age: 30
    }
];

describe('UserController Test', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => ({
                json: jest.fn()
            })),
            next: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    describe('getAll', () => {
        test('send data when service returns user array', async () => {
            UserService.prototype.getAll = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers));

            await userController.getAll(mockRequest, mockResponse);

            expect(UserService.prototype.getAll).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe('getById', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data when service returns user', async () => {
            UserService.prototype.getById = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.getById(mockRequest, mockResponse);

            expect(UserService.prototype.getById).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers[0]);
        });
    });

    describe('setDeleted', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send proper responce when service deletes user', async () => {
            UserService.prototype.delete = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.setDeleted(mockRequest, mockResponse);

            expect(UserService.prototype.delete).toHaveBeenCalledWith('1');
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        });
    });

    describe('update', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' },
                body: mockUsers[0]
            };
        });

        test('send proper response when service updates user', async () => {
            UserService.prototype.update = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.update(mockRequest, mockResponse);

            expect(UserService.prototype.update).toHaveBeenCalledWith(
                '1',
                mockUsers[0]
            );
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT)
        });
    });

    describe('create', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockUsers[0]
            };
        });

        test('send proper sesponse when service creates user', async () => {
            UserService.prototype.add = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.create(mockRequest, mockResponse);

            expect(UserService.prototype.add).toHaveBeenCalledWith(mockUsers[0]);
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.CREATED)
        });
    });

    describe('getAutoSuggestions', () => {
        beforeEach(() => {
            mockRequest = {
                query: {
                    loginSubstring: 'ale',
                    limit: 5
                }
            };
        });

        test('send data when service returns user list', async () => {
            UserService.prototype.getAutoSuggestions = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers));

            await userController.getAutoSuggestions(mockRequest, mockResponse);

            expect(UserService.prototype.getAutoSuggestions).toHaveBeenCalledWith(
                mockRequest.query.loginSubstring,
                mockRequest.query.limit
            );
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });
    });
});
