import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constants';
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

const myServices = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await ServicesOfService.myServices(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ServicesOfService.getAllServices(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServicesOfService.getSingleService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service fetched successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await ServicesOfService.updateService(id, req.body, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await ServicesOfService.deleteService(id, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  myServices,
};
