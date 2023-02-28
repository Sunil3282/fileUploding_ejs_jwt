
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class FileUpload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FileUpload.init({
    extension: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    fileSize: DataTypes.BIGINT,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FileUpload',
  });
  return FileUpload;
};