const Si_permiso = {};

Si_permiso.findByIdSi_modulo = (idSi_modulo, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo 
             FROM si_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_permiso.si_rol_idsi_rol INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_permiso.si_modulo_idsi_modulo 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_permiso.created_by ` : ""} 
             WHERE si_permiso.is_deleted = false 
                  AND si_permiso.si_modulo_idsi_modulo = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_permiso.created_by = ?` : ""}`
        keys = [idSi_modulo];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso encontrad@' });
    });
};

Si_permiso.findByIdSi_rol = (idSi_rol, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo 
             FROM si_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_permiso.si_rol_idsi_rol INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_permiso.si_modulo_idsi_modulo 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_permiso.created_by ` : ""} 
             WHERE si_permiso.is_deleted = false 
                  AND si_permiso.si_rol_idsi_rol = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_permiso.created_by = ?` : ""}`
        keys = [idSi_rol];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso encontrad@' });
    });
};

Si_permiso.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo 
             FROM si_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_permiso.si_rol_idsi_rol INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_permiso.si_modulo_idsi_modulo 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_permiso.created_by ` : ""} 
             WHERE si_permiso.is_deleted = false 
                  AND si_permiso.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_permiso.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso leíd@' });
    });
};

Si_permiso.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo 
             FROM si_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_permiso.si_rol_idsi_rol INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_permiso.si_modulo_idsi_modulo 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_permiso.created_by ` : ""} 
             WHERE si_permiso.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_permiso.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso leíd@' });
    });
};

Si_permiso.findById = (idSi_permiso, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo 
             FROM si_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_permiso.si_rol_idsi_rol INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_permiso.si_modulo_idsi_modulo 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_permiso.created_by ` : ""} 
             WHERE si_permiso.is_deleted = false 
                  AND idsi_permiso = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_permiso.created_by = ?` : ""}`
        keys = [idSi_permiso];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso encontrad@' });
    });
};

Si_permiso.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_permiso) AS count FROM si_permiso`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso contabilizad@' });
    });
};

Si_permiso.exist = (idSi_permiso, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_permiso WHERE idsi_permiso = ?) AS exist`;
    keys = [idSi_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso verificad@' });
    });
};

Si_permiso.insert = (Si_permiso, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_permiso SET ?`;
    keys = [Si_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso cread@' });
    });
};

Si_permiso.update = (Si_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_permiso SET ? WHERE idsi_permiso = ? AND created_by = ?`;
        keys = [Si_permiso, Si_permiso.idsi_permiso, created_by];
    } else {
        query = `UPDATE si_permiso SET ? WHERE idsi_permiso = ?`;
        keys = [Si_permiso, Si_permiso.idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso actualizad@' });
    });
};

Si_permiso.remove = (idsi_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_permiso WHERE idsi_permiso = ? AND created_by = ?`;
        keys = [idsi_permiso, created_by];
    } else {
        query = `DELETE FROM si_permiso WHERE idsi_permiso = ?`;
        keys = [idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso eliminad@' });
    });
};

Si_permiso.logicRemove = (idsi_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_permiso SET is_deleted = 1 WHERE idsi_permiso = ? AND created_by = ?`;
        keys = [idsi_permiso, created_by];
    } else {
        query = `UPDATE si_permiso SET is_deleted = 1 WHERE idsi_permiso = ?`;
        keys = [idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso eliminad@' });
    });
};

Si_permiso.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_permiso;
