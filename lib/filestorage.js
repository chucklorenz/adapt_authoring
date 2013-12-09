/**
 * Module depencies
 */

var path = require('path'),
    fs = require('fs'),
    logger = require('./logger'),
    pluginmanager = require('./pluginmanager'),
    configuration = require('./configuration');

/**
 *
 * @constructor
 */

function FileStorage() {
  this.type = 'none';
}

/**
 * Gets the contents of a file as a Buffer
 *
 * @abstract
 * @param {string} filePath - the path to the file
 * @param {function} callback - function of the form function(error, buffer)
 */

FileStorage.prototype.getFileContents = function(filePath, callback) {
  logger.log('warn', 'FileStorage#getFileContents must be implemented by extending object!');
  callback(new Error('FileStorage#getFileContents not implemented'));
};

/**
 * Puts the given contents to a file
 *
 * @abstract
 * @param {string} filePath - the path to the file
 * @param {string} options - see {@link http://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback |Nodejs fs}
 * @param {Buffer} buffer - the contents to write to the file
 * @param {function} callback - function of the form function(error, written, buffer)
 * see {@link http://nodejs.org/docs/latest/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback | Nodejs fs module }
 */

FileStorage.prototype.putFileContents = function(filePath, options, buffer, callback) {
  logger.log('warn', 'FileStorage#putFileContents must be implemented by extending object!');
  callback(new Error('FileStorage#putFileContents not implemented'));
};

/**
 * Deletes a file
 *
 * @abstract
 * @param {string} filePath - the path to the file
 * @param {function} callback - function of the form function(error)
 */

FileStorage.prototype.deleteFile = function(filePath, callback) {
  logger.log('warn', 'FileStorage#deleteFile must be implemented by extending object!');
  callback(new Error('FileStorage#deleteFile not implemented'));
};

/**
 * Moves a file from the given path to the new path
 *
 * @abstract
 * @param {string} oldPath - the original location of the file
 * @param {string} newPath - the intended location of the file
 * @param {function} callback - function of the form function(error)
 */

FileStorage.prototype.moveFile = function(oldPath, newPath, callback) {
  logger.log('warn', 'FileStorage#moveFile must be implemented by extending object!');
  callback(new Error('FileStorage#moveFile not implemented'));
};

/**
 * Creates a directory at the given path
 *
 * @abstract
 * @param {string} filePath - the path to create the directory at
 * @param {function} callback - function of the form function(error)
 */

FileStorage.prototype.createDirectory = function(filePath, callback) {
  logger.log('warn', 'FileStorage#createDirectory must be implemented by extending object!');
  callback(new Error('FileStorage#createDirectory not implemented'));
};

/**
 * Removes a directory at the given path
 *
 * @abstract
 * @param {string} filePath - the path to the directory to be removed
 * @param {function} callback - function of the form function(error)
 */

FileStorage.prototype.removeDirectory = function(filePath, callback) {
  logger.log('warn', 'FileStorage#removeDirectory must be implemented by extending object!');
  callback(new Error('FileStorage#removeDirectory not implemented'));
};

/**
 * Gets a directory listing at filePath
 *
 * @abstract
 * @param {string} filePath - the path to the directory
 * @param {function} callback - function of the form function(error, results)
 */

FileStorage.prototype.getDirectoryListing = function(filePath, callback) {
  logger.log('warn', 'FileStorage#getDirectoryListing must be implemented by extending object!');
  callback(new Error('FileStorage#getDirectoryListing not implemented'));
};

/**
 * Gets information on the file located at filePath, such as timecreated, timemodified etc.
 *
 * @abstract
 * @param {string} filePath - the path to the desired file
 * @param {function} callback - function of the form function(error, result) where 'result' is an object with stats properties
 */

FileStorage.prototype.getFileStats = function(filePath, callback) {
  logger.log('warn', 'FileStorage#getFileStats must be implemented by extending object!');
  callback(new Error('FileStorage#getFileStats not implemented'));
};

/**
 * Returns a filestorage plugin instance of the specified type
 *
 * @api public
 * @param {string} type - the type of the filestorage plugin: eg 'local', 'amazons3'
 */

function getStorage(type, callback) {
  var pluginManager = pluginmanager.getManager();
  pluginManager.getPlugin('filestorage', type, function (error, pluginInfo) {
    if (error) {
      logger.log('warning', 'Failed to retrieve filestorage plugin: ' + type, error);
      callback(error);
    } else {
      // @TODO - should we cache this result? I think best not to; require will cache anyway. Still ...
      try {
        var Storage = require(pluginInfo.fullPath);
        callback(null, new Storage());
      } catch (error) {
        callback(error);
      }
    }
  });
}

/**
 * preload function
 *
 * @param {object} app - AdaptBuilder instance
 */

function preload (app, done) {
  app.filestorage = this;
  done();
}

/**
 * Module exports
 */

module.exports.getStorage = getStorage;
module.exports.FileStorage = FileStorage;
module.exports.preload = preload;
