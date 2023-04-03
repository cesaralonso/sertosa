const Si_sesionestado = {};

Si_sesionestado.findByIdSi_sesion = (idSi_sesion, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesionestado.*, _si_sesion_idsi_sesion.idsi_sesion as si_sesion_si_sesion_idsi_sesion 
             FROM si_sesionestado 
             INNER JOIN si_sesion as _si_sesion_idsi_sesion ON _si_sesion_idsi_sesion.idsi_sesion = si_sesionestado.si_sesion_idsi_sesion 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesionestado.created_by ` : ""} 
             WHERE si_sesionestado.is_deleted = false 
                  AND si_sesionestado.si_sesion_idsi_sesion = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_sesionestado.created_by = ?` : ""}`
        keys = [idSi_sesion];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado encontrad@' });
    });
};

Si_sesionestado.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesionestado.*, _si_sesion_idsi_sesion.idsi_sesion as si_sesion_si_sesion_idsi_sesion 
             FROM si_sesionestado 
             INNER JOIN si_sesion as _si_sesion_idsi_sesion ON _si_sesion_idsi_sesion.idsi_sesion = si_sesionestado.si_sesion_idsi_sesion 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesionestado.created_by ` : ""} 
             WHERE si_sesionestado.is_deleted = false 
                  AND si_sesionestado.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_sesionestado.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado leíd@' });
    });
};

Si_sesionestado.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesionestado.*, _si_sesion_idsi_sesion.idsi_sesion as si_sesion_si_sesion_idsi_sesion 
             FROM si_sesionestado 
             INNER JOIN si_sesion as _si_sesion_idsi_sesion ON _si_sesion_idsi_sesion.idsi_sesion = si_sesionestado.si_sesion_idsi_sesion 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesionestado.created_by ` : ""} 
             WHERE si_sesionestado.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_sesionestado.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado leíd@' });
    });
};

Si_sesionestado.findById = (idSi_sesionestado, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesionestado.*, _si_sesion_idsi_sesion.idsi_sesion as si_sesion_si_sesion_idsi_sesion 
             FROM si_sesionestado 
             INNER JOIN si_sesion as _si_sesion_idsi_sesion ON _si_sesion_idsi_sesion.idsi_sesion = si_sesionestado.si_sesion_idsi_sesion 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesionestado.created_by ` : ""} 
             WHERE si_sesionestado.is_deleted = false 
                  AND idsi_sesionestado = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_sesionestado.created_by = ?` : ""}`
        keys = [idSi_sesionestado];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado encontrad@' });
    });
};

Si_sesionestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_sesionestado) AS count FROM si_sesionestado`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado contabilizad@' });
    });
};

Si_sesionestado.exist = (idSi_sesionestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_sesionestado WHERE idsi_sesionestado = ?) AS exist`;
    keys = [idSi_sesionestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado verificad@' });
    });
};

Si_sesionestado.insert = (Si_sesionestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_sesionestado SET ?`;
    keys = [Si_sesionestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado cread@' });
    });
};

Si_sesionestado.update = (Si_sesionestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_sesionestado SET ? WHERE idsi_sesionestado = ? AND created_by = ?`;
        keys = [Si_sesionestado, Si_sesionestado.idsi_sesionestado, created_by];
    } else {
        query = `UPDATE si_sesionestado SET ? WHERE idsi_sesionestado = ?`;
        keys = [Si_sesionestado, Si_sesionestado.idsi_sesionestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado actualizad@' });
    });
};

Si_sesionestado.remove = (idsi_sesionestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_sesionestado WHERE idsi_sesionestado = ? AND created_by = ?`;
        keys = [idsi_sesionestado, created_by];
    } else {
        query = `DELETE FROM si_sesionestado WHERE idsi_sesionestado = ?`;
        keys = [idsi_sesionestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado eliminad@' });
    });
};

Si_sesionestado.logicRemove = (idsi_sesionestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_sesionestado SET is_deleted = 1 WHERE idsi_sesionestado = ? AND created_by = ?`;
        keys = [idsi_sesionestado, created_by];
    } else {
        query = `UPDATE si_sesionestado SET is_deleted = 1 WHERE idsi_sesionestado = ?`;
        keys = [idsi_sesionestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesionestado eliminad@' });
    });
};

Si_sesionestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_sesionestado;
