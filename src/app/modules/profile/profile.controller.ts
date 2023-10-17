import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await ProfileService.createProfile(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile created successfully',
    data: result,
  });
});

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await ProfileService.getSingleProfile(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile fetched successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await ProfileService.updateProfile(user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const ProfileController = {
  createProfile,
  getSingleProfile,
  updateProfile,
};
