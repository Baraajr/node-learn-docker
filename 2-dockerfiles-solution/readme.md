## this is a solution for multiple environment

we used two Dockerfile s
one fro pro
one for dev => we installed only the production dependency and run npm start

> > RUN npm ci --only=production
> > CMD ["npm", "start"]
