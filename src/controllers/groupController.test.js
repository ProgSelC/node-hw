jest.mock('../services/groupService', () => (function GroupService() { }));

const { StatusCodes } = require('http-status-codes');
const GroupService = require('../services/groupService');
const groupController = require('./groupController');

const mockGroups = [
    {
        id: '1',
        name: 'Admin',
        permissions: [
            'ADD',
            'SHARE',
            'WRITE',
            'UPLOAD'
        ],
        users: [
            {
                id: '1',
                login: 'Alice'
            }
        ]
    },
    {
        id: '2',
        name: 'Readonly',
        permissions: [],
        users: [
            {
                id: '3',
                login: 'Mark'
            }
        ]
    }
];

describe('GroupController Test', () => {
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
        test('send data when service returns group array', async () => {
            GroupService.prototype.getAll = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups));

            await groupController.getAll(mockRequest, mockResponse);

            expect(GroupService.prototype.getAll).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups);
        });
    });

    describe('getById', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data when service returns group', async () => {
            GroupService.prototype.getById = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.getById(mockRequest, mockResponse);

            expect(GroupService.prototype.getById).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups[0]);
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send proper responce when service deletes group', async () => {
            GroupService.prototype.delete = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.remove(mockRequest, mockResponse);

            expect(GroupService.prototype.delete).toHaveBeenCalledWith('1');
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        });
    });

    describe('update', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' },
                body: mockGroups[0]
            };
        });

        test('send proper response when service updates group', async () => {
            GroupService.prototype.update = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.update(mockRequest, mockResponse);

            expect(GroupService.prototype.update).toHaveBeenCalledWith(
                '1',
                mockGroups[0]
            );
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT)
        });
    });

    describe('add', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockGroups[0]
            };
        });

        test('send proper sesponse when service creates group', async () => {
            GroupService.prototype.add = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.add(mockRequest, mockResponse);

            expect(GroupService.prototype.add).toHaveBeenCalledWith(mockGroups[0]);
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.CREATED)
        });
    });

    describe('addUsersToGroup', () => {
        beforeEach(() => {
            mockRequest = {
                body: {
                    groupId: '1',
                    userIds: ['1', '3']
                }
            };
        });

        test('send proper response when service adds users to a group', async () => {
            GroupService.prototype.addUsersToGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve());

            await groupController.addUsersToGroup(mockRequest, mockResponse);

            expect(GroupService.prototype.addUsersToGroup).toHaveBeenCalledWith(
                mockRequest.body.groupId,
                mockRequest.body.userIds
            );
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT)
        });
    });
});
