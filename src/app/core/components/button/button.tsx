import {FC, MouseEventHandler, ReactElement} from 'react';
import {IButtonProps, IButtonPropsIcons} from './button.model';
import {BUTTON_CLASS_MAP, BUTTON_PROPS} from './button.constants';
import {getComponentClassName} from 'core/utils/styles.utils';
import {getButtonIcons} from './button.utils';
import classes from './classes.module.less';
import {ButtonIcon} from 'core/components/button/button-icon/button-icon';

export const Button: FC<IButtonProps> = (props: IButtonProps): ReactElement => {
  const {before: iconBefore, after: iconAfter}: IButtonPropsIcons = getButtonIcons(props);
  const onClick: MouseEventHandler = (event): void => {
    if (props.loading) {
      return;
    }

    if (typeof props.clickHandler === 'function') {
      props.clickHandler(event);
    }
  }

  props = {...BUTTON_PROPS, ...props};

  return <button {...props.attrs}
                 disabled={!!props.disabled}
                 className={getComponentClassName(BUTTON_CLASS_MAP, props, classes.btn)}
                 onClick={onClick}>
    {props.children
      ? props.children
      : <>
        <ButtonIcon className={classes.btn__beforeIcon} loading={props.loading} icon={iconBefore}></ButtonIcon>
        {props.label && <span className={classes.btn__label}>{props.label}</span>}
        <ButtonIcon className={classes.btn__afterIcon} icon={iconAfter}></ButtonIcon>
      </>
    }
  </button>
}