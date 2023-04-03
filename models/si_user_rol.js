const Si_user_rol = {};

Si_user_rol.findByIdSi_rol = (idSi_rol, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_user_rol.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_user_rol 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_user_rol.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_user_rol.si_rol_idsi_rol 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_user_rol.created_by ` : ""} 
             WHERE si_user_rol.is_deleted = false 
                  AND si_user_rol.si_rol_idsi_rol = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_user_rol.created_by = ?` : ""}`
        keys = [idSi_rol];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol encontrad@' });
    });
};

Si_user_rol.findByIdSi_user = (idSi_user, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_user_rol.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_user_rol 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_user_rol.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_user_rol.si_rol_idsi_rol 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_user_rol.created_by ` : ""} 
             WHERE si_user_rol.is_deleted = false 
                  AND si_user_rol.si_user_idsi_user = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_user_rol.created_by = ?` : ""}`
        keys = [idSi_user];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol encontrad@' });
    });
};

Si_user_rol.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_user_rol.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_user_rol 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_user_rol.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_user_rol.si_rol_idsi_rol 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_user_rol.created_by ` : ""} 
             WHERE si_user_rol.is_deleted = false 
                  AND si_user_rol.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_user_rol.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol leíd@' });
    });
};

Si_user_rol.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_user_rol.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_user_rol 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_user_rol.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_user_rol.si_rol_idsi_rol 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_user_rol.created_by ` : ""} 
             WHERE si_user_rol.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_user_rol.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol leíd@' });
    });
};

Si_user_rol.findById = (idSi_user_rol, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_user_rol.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_user_rol 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_user_rol.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_user_rol.si_rol_idsi_rol 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_user_rol.created_by ` : ""} 
             WHERE si_user_rol.is_deleted = false 
                  AND idsi_user_rol = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_user_rol.created_by = ?` : ""}`
        keys = [idSi_user_rol];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol encontrad@' });
    });
};

Si_user_rol.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_user_rol) AS count FROM si_user_rol`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol contabilizad@' });
    });
};

Si_user_rol.exist = (idSi_user_rol, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_user_rol WHERE idsi_user_rol = ?) AS exist`;
    keys = [idSi_user_rol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol verificad@' });
    });
};

Si_user_rol.insert = (Si_user_rol, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_user_rol SET ?`;
    keys = [Si_user_rol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol cread@' });
    });
};

Si_user_rol.update = (Si_user_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_user_rol SET ? WHERE idsi_user_rol = ? AND created_by = ?`;
        keys = [Si_user_rol, Si_user_rol.idsi_user_rol, created_by];
    } else {
        query = `UPDATE si_user_rol SET ? WHERE idsi_user_rol = ?`;
        keys = [Si_user_rol, Si_user_rol.idsi_user_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol actualizad@' });
    });
};

Si_user_rol.remove = (idsi_user_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_user_rol WHERE idsi_user_rol = ? AND created_by = ?`;
        keys = [idsi_user_rol, created_by];
    } else {
        query = `DELETE FROM si_user_rol WHERE idsi_user_rol = ?`;
        keys = [idsi_user_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol eliminad@' });
    });
};

Si_user_rol.logicRemove = (idsi_user_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_user_rol SET is_deleted = 1 WHERE idsi_user_rol = ? AND created_by = ?`;
        keys = [idsi_user_rol, created_by];
    } else {
        query = `UPDATE si_user_rol SET is_deleted = 1 WHERE idsi_user_rol = ?`;
        keys = [idsi_user_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user_rol eliminad@' });
    });
};

Si_user_rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_user_rol;
