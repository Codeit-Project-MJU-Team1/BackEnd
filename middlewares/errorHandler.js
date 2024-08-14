import {Prisma} from '@prisma/client';
export default function errorHandler(error, req, res, next) {
  if (error.name === 'StructError' ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(400).send({ message: '잘못된 요청입니다' });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    res.sendStatus(404);
  }
  const status = error.code ?? 500;
  console.error(error);
  return res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message ?? 'Internal Server Error',
    data: error.data ?? undefined,
    date: new Date(),
  });
  }
  