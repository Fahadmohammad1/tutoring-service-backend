import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const createStudentProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProfileService.createStudentProfile(req.body, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile created successfully',
    data: result,
  });
});

export const ProfileController = {
  createStudentProfile,
};
