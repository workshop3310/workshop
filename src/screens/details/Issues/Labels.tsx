import type {FC} from 'react';
import type {components} from '@octokit/openapi-types';
import {View, Text} from 'react-native';
import {human, iOSColors} from 'react-native-typography';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.25rem',
  },
});

function getLuma(color: string) {
  const rgb = parseInt(color.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // per ITU-R BT.709
  // return value range is 0..255, where 0 is the darkest and 255 is the lightest
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const cache = new Map();
function getLabelStyle(color: string, border: string) {
  const key = `${color}-${border}`;
  if (!cache.has(key)) {
    const style = EStyleSheet.create({
      label: {
        backgroundColor: color,
        borderWidth: 1,
        borderColor: border,
        paddingVertical: '0.125rem',
        paddingHorizontal: '0.25rem',
        borderRadius: '0.25rem',
      },
    }).label;
    cache.set(key, style);
  }

  return cache.get(key);
}

type TLabel = components['schemas']['issue']['labels'][0];

interface TLabelProps {
  label: components['schemas']['issue']['labels'][0];
}
const Label: FC<TLabelProps> = ({label}) => {
  const [labelText, labelColor] =
    typeof label === 'string'
      ? [label, iOSColors.midGray]
      : [label.name, label.color ? `#${label.color}` : iOSColors.midGray];

  if (!labelText) {
    return null;
  }

  const luma = getLuma(labelColor);

  const border = luma > 250 ? iOSColors.midGray : labelColor;
  const textStyle = luma < 120 ? human.footnoteWhite : human.footnote;

  return (
    <View style={getLabelStyle(labelColor, border)}>
      <Text style={textStyle}>{labelText}</Text>
    </View>
  );
};

interface TLabels {
  labels: TLabel[];
}
const Labels: FC<TLabels> = ({labels}) => {
  if (!labels.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {labels.map(label => (
        <Label
          key={typeof label === 'string' ? label : label.name}
          label={label}
        />
      ))}
    </View>
  );
};

export default Labels;
