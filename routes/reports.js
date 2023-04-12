const router = require('express').Router();
const Report = require('../models/report');
const passport = require('passport');
const permissions = require('../config/permissions');
const dotenv = require('dotenv');
dotenv.config();

// Multer File upload settings
const DIR = './public/report'; // CREAR CARPETA SI SE REQUIERE

router
    .get('/report1', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'report', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Report.report1(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Report.response(res, error, data);
                    });
                } else {
                    return Report.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/report2', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'report', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Report.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Report.response(res, error, data);
                    });
                } else {
                    return Report.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/report3', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'report', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Report.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Report.response(res, error, data);
                    });
                } else {
                    return Report.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/report4', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'report', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Report.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Report.response(res, error, data);
                    });
                } else {
                    return Report.response(res, error, permission);
                }
            });
        })(req, res, next);
    });
    
    module.exports = router;
    