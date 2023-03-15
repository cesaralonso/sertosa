const router = require('express').Router();
const Si_rol = require('../models/si_rol');
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
const DIR = './public/si_rol'; // CREAR CARPETA SI SE REQUIERE

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

            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_rol.findFromTo(req.params.fechaDesde, req.params.fechaHasta, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Si_rol.response(res, error, data);
                    })
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_rol.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Si_rol.response(res, error, data);
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_rol.count(req.mysql, (error, data) => {
                        return Si_rol.response(res, error, data);
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_rol.exist(req.params.id, req.mysql, (error, data) => {
                        return Si_rol.response(res, error, data);
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_rol.findById(req.params.id, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Si_rol.response(res, error, data);
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_rol.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro eliminado',
                              itemId: req.params.id,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 19
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Si_rol.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Si_rol.response(res, error, data);
                      }
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _si_rol = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_rol.update(_si_rol, created_by, req.mysql, (error, data) => {
                      if (!error && data.result.affectedRows) {
                          const params = {
                              accion: 'Registro actualizado',
                              itemId: _si_rol.idsi_rol,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 19
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Si_rol.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Si_rol.response(res, error, data);
                      }
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/file', upload.single('documento'), (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_rol = req.body;
                    _si_rol.created_by = auth_data.user.idsi_user;

                    // CAPTURA URL DE ARCHIVO
                    if (req.file && req.file.filename) {
                        const _url = process.env.HOST || req.protocol + '://' + req.get('host');
                        const _documento =  _url + '/si_rol/' + req.file.filename;
                        _folio.documento = _documento;
                    }

                    Si_rol.insert( _si_rol, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado con archivo adjunto',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 19
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Si_rol.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Si_rol.response(res, error, data);
                      }
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'si_rol', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_rol = req.body;
                    _si_rol.created_by = auth_data.user.idsi_user;
                    Si_rol.insert( _si_rol, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 19
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Si_rol.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Si_rol.response(res, error, data);
                      }
                    });
                } else {
                    return Si_rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    });

module.exports = router;
