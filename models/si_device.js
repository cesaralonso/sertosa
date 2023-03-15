const Si_device = {};

Si_device.findByIdSi_rol = (idSi_rol, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_device.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_device 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_device.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_device.si_rol_idsi_rol 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_device.created_by ` : ""} 
             WHERE si_device.is_deleted = false 
                  AND si_device.si_rol_idsi_rol = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_device.created_by = ?` : ""}`
        keys = [idSi_rol];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device encontrad@' });
    });
};

Si_device.findByIdSi_user = (idSi_user, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_device.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_device 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_device.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_device.si_rol_idsi_rol 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_device.created_by ` : ""} 
             WHERE si_device.is_deleted = false 
                  AND si_device.si_user_idsi_user = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_device.created_by = ?` : ""}`
        keys = [idSi_user];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device encontrad@' });
    });
};

Si_device.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_device.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_device 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_device.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_device.si_rol_idsi_rol 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_device.created_by ` : ""} 
             WHERE si_device.is_deleted = false 
                  AND si_device.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_device.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device leíd@' });
    });
};

Si_device.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_device.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_device 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_device.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_device.si_rol_idsi_rol 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_device.created_by ` : ""} 
             WHERE si_device.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_device.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device leíd@' });
    });
};

Si_device.findById = (idSi_device, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_device.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol 
             FROM si_device 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_device.si_user_idsi_user INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_device.si_rol_idsi_rol 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_device.created_by ` : ""} 
             WHERE si_device.is_deleted = false 
                  AND idsi_device = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_device.created_by = ?` : ""}`
        keys = [idSi_device];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device encontrad@' });
    });
};

Si_device.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_device) AS count FROM si_device`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_device contabilizad@' });
    });
};

Si_device.exist = (idSi_device, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_device WHERE idsi_device = ?) AS exist`;
    keys = [idSi_device];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_device verificad@' });
    });
};

Si_device.insert = (Si_device, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_device SET ?`;
    keys = [Si_device];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_device cread@' });
    });
};

Si_device.update = (Si_device, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_device SET ? WHERE idsi_device = ? AND created_by = ?`;
        keys = [Si_device, Si_device.idsi_device, created_by];
    } else {
        query = `UPDATE si_device SET ? WHERE idsi_device = ?`;
        keys = [Si_device, Si_device.idsi_device];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device actualizad@' });
    });
};

Si_device.remove = (idsi_device, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_device WHERE idsi_device = ? AND created_by = ?`;
        keys = [idsi_device, created_by];
    } else {
        query = `DELETE FROM si_device WHERE idsi_device = ?`;
        keys = [idsi_device];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device eliminad@' });
    });
};

Si_device.logicRemove = (idsi_device, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_device SET is_deleted = 1 WHERE idsi_device = ? AND created_by = ?`;
        keys = [idsi_device, created_by];
    } else {
        query = `UPDATE si_device SET is_deleted = 1 WHERE idsi_device = ?`;
        keys = [idsi_device];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_device eliminad@' });
    });
};

Si_device.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_device;
