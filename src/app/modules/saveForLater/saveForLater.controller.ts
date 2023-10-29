import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SaveForLaterService } from './saveForLater.service';

const addToSaveLater = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await SaveForLaterService.addToSaveLater(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Added to save for later',
    data: result,
  });
});

export const SaveForLaterController = {
  addToSaveLater,
};
