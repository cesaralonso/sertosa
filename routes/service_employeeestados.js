const router = require('express').Router();
const Service_employeeestado = require('../models/service_employeeestado');
const passport = require('passport');
const permissions = require('../config/permissions');
const ResponseService = require('../services/responseService');

router
    .get('/service_employee/:idservice_employee', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'service_employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Service_employeeestado.findByIdServiceemployee(req.params.idservice_employee, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Service_employeeestado.response(res, error, data);
                    });
                } else {
                    return Service_employeeestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'service_employee', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Service_employeeestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro eliminado',
                              itemId: req.params.id,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 13
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Service_employeeestado.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Service_employeeestado.response(res, error, data);
                      }
                    });
                } else {
                    return Service_employeeestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    });

module.exports = router;
