import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskActions";



export function Settings() {
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSetting(e: React.FormEvent<HTMLFormElement>) {
    const formError = [];
    e.preventDefault();
    showMessage.dismiss();
    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formError.push('Digite somente números para todos os campos');
    }

    if (workTime < 1 || workTime > 99) {
      formError.push('O tempo de foco deve estar entre 1 e 99 minutos');
    }

    if (shortBreakTime < 1 || workTime > 30) {
      formError.push('O tempo de foco deve estar entre 1 e 30 descanso curto');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formError.push('O tempo de foco deve estar entre 1 e 60 descanso longo');
    }

    if (formError.length > 0) {
      formError.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTING,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      }
    });
    showMessage.success('Configurações salvas com sucesso');
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>
          Configurações
        </Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>Modifique as Configurações para tempo de foco, descanso curto e descanso longo</p>
      </Container>
      <Container>
        <form onSubmit={handleSaveSetting} action='' className="form">
          <div className="formRow">
            <DefaultInput id="workTime" labelText="foco" ref={workTimeInputRef} defaultValue={state.config.workTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultInput id="shortBreakTime" labelText="Descanso curto" ref={shortBreakTimeInputRef} defaultValue={state.config.shortBreakTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultInput id="longBreakTime" labelText="Descanso longo" ref={longBreakTimeInputRef} defaultValue={state.config.longBreakTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultButton icon={<SaveIcon />} aria-label="Salvar configurações"
              title="Salvar configurações" />
          </div>
        </form>
      </Container>
    </MainTemplate >
  )
}