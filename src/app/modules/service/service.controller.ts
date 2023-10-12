import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServicesOfService } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await ServicesOfService.createService(req.body, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
};
