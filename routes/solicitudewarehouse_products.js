const router = require('express').Router();
const Solicitudewarehouse_product = require('../models/solicitudewarehouse_product');
const Solicitudewarehouse = require('../models/solicitudewarehouse');
const Orderin = require('../models/orderin');

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
const DIR = './public/solicitudewarehouse_product'; // CREAR CARPETA SI SE REQUIERE

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

            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.findFromTo(req.params.fechaDesde, req.params.fechaHasta, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    })
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/product/:idsolicitudewarehouse_product', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.findByIdProduct(req.params.idsolicitudewarehouse_product, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/solicitudewarehouse/:idsolicitudewarehouse_product', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.findByIdSolicitudewarehouse(req.params.idsolicitudewarehouse_product, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.count(req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.exist(req.params.id, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Solicitudewarehouse_product.findById(req.params.id, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Solicitudewarehouse_product.response(res, error, data);
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {

                    // debo obtener la misma solicitud producto que hace referencia
                    Solicitudewarehouse_product.findById(req.params.id, auth_data.user, permission.only_own, req.mysql, (error, dataSolicitude) => {

                        if (dataSolicitude.result[0]) {

                            const _solicitudewarehouse_product = dataSolicitude.result[0];

                            // DEBE CREAR ORDEN DE ENTRADA PARA REGRESARLO
                            // quantity debe ser tomada de la solicitud

                            // DEBO OBTENER SOLICITUDEWAREHOUSE
                            Solicitudewarehouse.findById(_solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse, auth_data.user, permission.only_own, req.mysql, (error, dataSolicitudewarehouse) => {
                                
                                if (dataSolicitude.result[0]) {

                                    const _solicitudewarehouse = dataSolicitudewarehouse.result[0];
                                        
                                    const _orderin = {
                                        product_idproduct: _solicitudewarehouse_product.product_idproduct,
                                        motive: 'CANCELACIÓN',
                                        quantity: _solicitudewarehouse_product.quantity,
                                        warehouse_idwarehouse: _solicitudewarehouse.warehouse_idwarehouse,
                                        created_by: auth_data.user.idsi_user
                                    };
                                    console.log('_orderin', _orderin);
                                    Orderin.insert( _orderin, req.mysql, (error, data) => {
                                        if (!error) {
                                            const params = {
                                                accion: 'Registro creado',
                                                itemId: data.result.insertId,
                                                created_by: auth_data.user.idsi_user,
                                                idsi_modulo: 6
                                            };
                                            ResponseService.createLog(req, params, () => {
                                                ResponseService.sendAlert(req, params, () => {

                                                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                                                    Solicitudewarehouse_product.logicRemove(req.params.id, created_by, req.mysql, (error, dataToReturn) => {
                                                        if (!error) {
                                                            const params = {
                                                                accion: 'Registro eliminado',
                                                                itemId: req.params.id,
                                                                created_by: auth_data.user.idsi_user,
                                                                idsi_modulo: 28
                                                            };
                                                            ResponseService.createLog(req, params, () => {
                                                            ResponseService.sendAlert(req, params, () => {
                                                                return Solicitudewarehouse_product.response(res, error, dataToReturn);
                                                            });
                                                        });
                                                        } else {
                                                            // ENVIA RESPUESTA
                                                            return Solicitudewarehouse_product.response(res, error, data);
                                                        }
                                                    });

                                                });
                                            });
                                        } else {
                                            // ENVIA RESPUESTA
                                            return Orderin.response(res, error, data);
                                        }
                                    });
                                } else {
                                    // ENVIA RESPUESTA
                                    return Solicitudewarehouse.response(res, error, data);
                                }
                            });
                        } else {
                            // ENVIA RESPUESTA
                            return Solicitudewarehouse_product.response(res, error, data);
                        }
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _solicitudewarehouse_product = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Solicitudewarehouse_product.update(_solicitudewarehouse_product, created_by, req.mysql, (error, data) => {
                      if (!error && data.result.affectedRows) {
                          const params = {
                              accion: 'Registro actualizado',
                              itemId: _solicitudewarehouse_product.idsolicitudewarehouse_product,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 28
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Solicitudewarehouse_product.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Solicitudewarehouse_product.response(res, error, data);
                      }
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/file', upload.single('documento'), (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _solicitudewarehouse_product = req.body;
                    _solicitudewarehouse_product.created_by = auth_data.user.idsi_user;

                    // CAPTURA URL DE ARCHIVO
                    if (req.file && req.file.filename) {
                        const _url = process.env.HOST || req.protocol + '://' + req.get('host');
                        const _documento =  _url + '/solicitudewarehouse_product/' + req.file.filename;
                        _folio.documento = _documento;
                    }

                    Solicitudewarehouse_product.insert( _solicitudewarehouse_product, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado con archivo adjunto',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 28
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Solicitudewarehouse_product.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Solicitudewarehouse_product.response(res, error, data);
                      }
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'solicitudewarehouse_product', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _solicitudewarehouse_product = req.body;
                    _solicitudewarehouse_product.created_by = auth_data.user.idsi_user;
                    Solicitudewarehouse_product.insert( _solicitudewarehouse_product, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 28
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Solicitudewarehouse_product.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Solicitudewarehouse_product.response(res, error, data);
                      }
                    });
                } else {
                    return Solicitudewarehouse_product.response(res, error, permission);
                }
            });
        })(req, res, next);
    });

module.exports = router;
