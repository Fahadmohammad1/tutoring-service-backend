import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookmarkService } from './bookmark.service';

const addToBookmark = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;

  const result = await BookmarkService.addToBookmark(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Added to save for later',
    data: result,
  });
});
const getAllBookmark = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;

  const result = await BookmarkService.getAllBookmark(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved Successfully!',
    data: result,
  });
});

const getSingleBookmark = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;

  const result = await BookmarkService.getSingleBookmark(userId, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved Successfully!',
    data: result,
  });
});

const updateBookmark = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;
  const result = await BookmarkService.updateBookmark(userId, req.body, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item updated Successfully!',
    data: result,
  });
});

const deleteBookmark = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;
  const result = await BookmarkService.deleteBookmark(userId, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item deleted Successfully!',
    data: result,
  });
});

export const BookmarkController = {
  addToBookmark,
  getAllBookmark,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
};
