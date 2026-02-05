import type { ToastContentProps } from 'react-toastify';
import style from './style.module.css';
import { DefaultButton } from '../DefaultButton';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={style.Container}>
        <p>{data}</p>
        <div className={style.buttonContainer}>
          <DefaultButton onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            arial-label='Confirmar ação e fechar'
            title='Confirmar ação e fechar' />
          <DefaultButton onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            arial-label='Confirmar ação e fechar'
            color='red'
            title='Confirmar ação e fechar' />
        </div>
      </div>
    </>
  )
}