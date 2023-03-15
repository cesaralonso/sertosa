const router = require('express').Router();
const Orderout = require('../models/orderout');
const passport = require('passport');
const permissions = require('../config/permissions');
/* const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const pdf = require('html-pdf');
const async = require('async');
const { PDFDocument } = require('pdf-lib'); */

const ResponseService = require('../services/responseService');
const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');

// Multer File upload settings
const DIR = './public/orderout'; // CREAR CARPETA SI SE REQUIERE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

router
    .get('/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.findFromTo(req.params.fechaDesde, req.params.fechaHasta, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    })
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/product/:idorderout', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.findByIdProduct(req.params.idorderout, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/warehouse/:idorderout', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.findByIdWarehouse(req.params.idorderout, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.count(req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.exist(req.params.id, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orderout.findById(req.params.id, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Orderout.response(res, error, data);
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orderout.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro eliminado',
                              itemId: req.params.id,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 7
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Orderout.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Orderout.response(res, error, data);
                      }
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orderout = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orderout.update(_orderout, created_by, req.mysql, (error, data) => {
                      if (!error && data.result.affectedRows) {
                          const params = {
                              accion: 'Registro actualizado',
                              itemId: _orderout.idorderout,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 7
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Orderout.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Orderout.response(res, error, data);
                      }
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/file', upload.single('documento'), (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _orderout = req.body;
                    _orderout.created_by = auth_data.user.idsi_user;

                    // CAPTURA URL DE ARCHIVO
                    if (req.file && req.file.filename) {
                        const _url = process.env.HOST || req.protocol + '://' + req.get('host');
                        const _documento =  _url + '/orderout/' + req.file.filename;
                        _folio.documento = _documento;
                    }

                    Orderout.insert( _orderout, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado con archivo adjunto',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 7
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Orderout.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Orderout.response(res, error, data);
                      }
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'orderout', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _orderout = req.body;
                    _orderout.created_by = auth_data.user.idsi_user;
                    Orderout.insert( _orderout, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 7
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Orderout.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Orderout.response(res, error, data);
                      }
                    });
                } else {
                    return Orderout.response(res, error, permission);
                }
            });
        })(req, res, next);
    });

module.exports = router;
