const async = require('async');

const Service = {};


Service.allTemplates = (user, only_own, connection, next) => {
    console.log('user', user);
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    async.waterfall([
        next => {

            // ENCUESTA
            query = `SELECT service.* 
             FROM service 
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                AND service.saveAsTemplate = 1
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`;

            keys = [];
            user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
            only_own ? keys.push(user.idsi_user) : null;

            connection.query(query, keys, (error, service) => {
                error ? next(error) : next(null, service)
            });
        },
        (service, next) => {

            // GRUPOS PREGUNTAS DE CADA ENCUESTA  (SELECT EXISTS(SELECT 1 FROM service WHERE idservice = ?) AS exist)

            async.each(service, (_service, nextIteration) => {
                query = `
                SELECT family.*
                FROM family 
                WHERE family.is_deleted = false 
                `;
                keys = [];

                connection.query(query, keys, (error, family) => {
                    _service.family = family;
                    error ? nextIteration(error) : nextIteration();
                });

            }, (error) => error ? next(error) : next(null, service))
        },
        (service, next) => {

            // PREGUNTAS DE CADA GRUPO ENCUESTA
            
                   /*  (SELECT clasificator_idclasificator FROM service_product 
                        WHERE service_product.service_idservice = ? 
                        AND service_product.product_idproduct = product.idproduct
                        AND service_product.is_deleted = false
                        GROUP BY service_product.product_idproduct
                        ) AS clasificator_idclasificator */

            async.each(service, (_service, nextIteration) => {
                async.each(_service.family, (family, nextIteration2) => {
                    query = `
                    SELECT product.*,

                    (SELECT EXISTS(SELECT 1 FROM service_product 
                        WHERE service_product.service_idservice = ? 
                        AND service_product.product_idproduct = product.idproduct
                        AND service_product.is_deleted = false
                        GROUP BY service_product.product_idproduct) 
                        AS exist) AS selected
                        
                    FROM product 
                    WHERE product.family_idfamily = ? 
                    AND product.is_deleted = false 
                    `;
                    keys = [_service.idservice, _service.idservice, family.idfamily];

                    connection.query(query, keys, (error, product) => {
                        family.product = product;
                        error ? nextIteration2(error) : nextIteration2();
                    });

                }, (error) => error ? nextIteration(error) : nextIteration());

            }, (error) => error ? next(error) : next(null, service));
        },

        (service, next) => {

            // EMPLEADOS

            async.each(service, (_service, nextIteration) => {
                async.each(_service.family, (family, nextIteration2) => {
                    query = `
                    SELECT employee.*,

                    (SELECT EXISTS(SELECT 1 
                        FROM service_employee 
                        INNER JOIN project_service as cs ON cs.idproject_service = service_employee.project_service_idproject_service
                        WHERE cs.service_idservice = ? 
                        AND service_employee.employee_idemployee = employee.idemployee
                        AND service_employee.is_deleted = false
                        AND cs.is_deleted = false) 
                        AS exist) AS selected

                    FROM employee 

                    WHERE employee.is_deleted = false 
                    `;
                    keys = [_service.idservice, family.idfamily];

                    connection.query(query, keys, (error, employee) => {
                        family.employee = employee;
                        error ? nextIteration2(error) : nextIteration2();
                    });

                }, (error) => error ? nextIteration(error) : nextIteration());

            }, (error) => error ? next(error) : next(null, service));
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            next(null, { success: true, result: result, message: 'Templates leídos' })
        }
    });

};





Service.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  AND service.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service leíd@' });
    });
};

Service.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service leíd@' });
    });
};

Service.findById = (idService, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  AND idservice = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [idService];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service encontrad@' });
    });
};

Service.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idservice) AS count FROM service`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service contabilizad@' });
    });
};

Service.exist = (idService, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM service WHERE idservice = ?) AS exist`;
    keys = [idService];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service verificad@' });
    });
};

Service.insert = (Service, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO service SET ?`;
    keys = [Service];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Service cread@' });
    });
};

Service.update = (Service, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service SET ? WHERE idservice = ? AND created_by = ?`;
        keys = [Service, Service.idservice, created_by];
    } else {
        query = `UPDATE service SET ? WHERE idservice = ?`;
        keys = [Service, Service.idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service actualizad@' });
    });
};

Service.remove = (idservice, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM service WHERE idservice = ? AND created_by = ?`;
        keys = [idservice, created_by];
    } else {
        query = `DELETE FROM service WHERE idservice = ?`;
        keys = [idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service eliminad@' });
    });
};

Service.logicRemove = (idservice, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service SET is_deleted = 1 WHERE idservice = ? AND created_by = ?`;
        keys = [idservice, created_by];
    } else {
        query = `UPDATE service SET is_deleted = 1 WHERE idservice = ?`;
        keys = [idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service eliminad@' });
    });
};

Service.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Service;
