import * as classNames from 'classnames';
import * as React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import TableCell from 'src/components/core/TableCell';
import TableRow from 'src/components/core/TableRow';
import Skeleton from 'src/components/Skeleton';

type ClassNames = 'root' | 'tableCell' | 'transparent';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    tableCell: {
      padding: 0,
      textAlign: 'center'
    },
    transparent: {
      backgroundColor: theme.bg.main
    }
  });

export interface Props {
  colSpan: number;
  transparent?: any;
}

type CombinedProps = Props & WithStyles<ClassNames>;

const tableRowLoading: React.StatelessComponent<CombinedProps> = props => {
  const { classes, transparent } = props;
  return (
    <TableRow
      className={classNames({
        [classes.transparent]: transparent
      })}
    >
      <TableCell
        colSpan={props.colSpan}
        className={classNames({
          [classes.tableCell]: true,
          [classes.transparent]: transparent
        })}
      >
        <Skeleton table columns={7} />
      </TableCell>
    </TableRow>
  );
};

const styled = withStyles(styles);

export default styled(tableRowLoading);
