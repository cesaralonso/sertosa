const router = require('express').Router();
const Employee = require('../models/employee');
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
const DIR = './public/employee'; // CREAR CARPETA SI SE REQUIERE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log('file', file);
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

            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.findFromTo(req.params.fechaDesde, req.params.fechaHasta, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    })
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/companyunits/:idemployee', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.findByIdCompanyunits(req.params.idemployee, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/si_user/:idemployee', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.findByIdSi_user(req.params.idemployee, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.all(auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.count(req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.exist(req.params.id, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Employee.findById(req.params.id, auth_data.user, permission.only_own, req.mysql, (error, data) => {
                        return Employee.response(res, error, data);
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Employee.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro eliminado',
                              itemId: req.params.id,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 4
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Employee.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Employee.response(res, error, data);
                      }
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _employee = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Employee.update(_employee, created_by, req.mysql, (error, data) => {
                      if (!error && data.result.affectedRows) {
                          const params = {
                              accion: 'Registro actualizado',
                              itemId: _employee.idemployee,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 4
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Employee.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Employee.response(res, error, data);
                      }
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/file', upload.single('documento'), (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
          if (!auth_data) {
               return next('auth_data refused');
          }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _employee = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;

                    // CAPTURA URL DE ARCHIVO
                    if (req.file && req.file.filename) {
                        const _url = process.env.HOST || req.protocol + '://' + req.get('host');
                        const _documento =  _url + '/employee/' + req.file.filename;
                        _employee.photo = _documento;
                    }

                    Employee.update(_employee, created_by, req.mysql, (error, data) => {
                      if (!error && data.result.affectedRows) {
                          const params = {
                              accion: 'Registro actualizado',
                              itemId: _employee.idemployee,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 4
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Employee.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Employee.response(res, error, data);
                      }
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/file', upload.single('documento'), (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _employee = req.body;
                    /* _employee.created_by = auth_data.user.idsi_user; */
                    _employee.created_by = _employee.si_user_idsi_user; // Toma el iduser del empleado como el del creador para permitir leer los propios, usando un permiso
                    
                    // CAPTURA URL DE ARCHIVO
                    if (req.file && req.file.filename) {
                        const _url = process.env.HOST || req.protocol + '://' + req.get('host');
                        const _documento =  _url + '/employee/' + req.file.filename;
                        _employee.photo = _documento;
                    }

                    Employee.insert( _employee, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado con archivo adjunto',
                              itemId: data.result.insertId,
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 4
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Employee.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Employee.response(res, error, data);
                      }
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if (!auth_data) {
               return next('auth_data refused');
            }
            permissions.module_permission(auth_data.modules, 'employee', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _employee = req.body;
                    /* _employee.created_by = auth_data.user.idsi_user; */
                    _employee.created_by = _employee.si_user_idsi_user; // Toma el iduser del empleado como el del creador para permitir leer los propios, usando un permiso
                    Employee.insert( _employee, req.mysql, (error, data) => {
                      if (!error) {
                          const params = {
                              accion: 'Registro creado',
                              itemId: (data.result.insertId) ? data.result.insertId : 1, // fix temporal, revisar
                              created_by: auth_data.user.idsi_user,
                              idsi_modulo: 4
                          };
                          ResponseService.createLog(req, params, () => {
                            ResponseService.sendAlert(req, params, () => {
                              return Employee.response(res, error, data);
                            });
                          });
                      } else {
                          // ENVIA RESPUESTA
                          return Employee.response(res, error, data);
                      }
                    });
                } else {
                    return Employee.response(res, error, permission);
                }
            });
        })(req, res, next);
    });

module.exports = router;
