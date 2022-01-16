export const routerTemplate = `
  import express from "express";
  
  const router = express.Router();

  router.get('/', (req, res, next) => {
    try {
      res.send('ok');
    } catch(error) {
      console.error(error);
      next(error);
    }
  });
`;
