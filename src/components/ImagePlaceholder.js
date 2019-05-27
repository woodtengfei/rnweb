/**
 * @Name ImagePlaceholder
 * @Description ImagePlaceholder
 * @author wood
 * @date 2019/3/19
 */
import React from 'react';
import {Image} from 'react-native';

const ImageDefaultSource = require('../../assets/images/common/ddb_image_default.png');
const ImageDefaultRecSource = require('../../assets/images/common/ddb_image_default_rec.png');
const ImageAvatarSource = require('../../assets/images/personal/icon_avatar_default.png');

const ImagePlaceholder = <Image style={{width: 100, height: 100}} source={ImageDefaultSource}/>;
const ImagePlaceholderRec = <Image style={{width: 120, height: 80}} source={ImageDefaultRecSource}/>;


export {
  ImageAvatarSource,
  ImageDefaultSource,
  ImageDefaultRecSource,
  ImagePlaceholder,
  ImagePlaceholderRec,
};
