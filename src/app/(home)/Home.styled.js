import styled from 'styled-components';

export const _home = styled.div`
  min-width: 100%;
  min-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 80px 32px;
  background: #171717;
  margin-bottom: 200px;
`;

export const _float = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const _label = styled.div`
  width: auto;
  height: 40px;
  padding: 8px 16px;
  background: #171717;
  color: #ffffff44;
  position: relative;
  letter-spacing: 0.25px;
  font-weight: 400;
  top: 0;
`;

export const _section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ $active }) => $active ? 1 : 0.15};
  transition: opacity 0.15s ease-out;
  &:hover {
    opacity: ${({ $active }) => $active ? 1 : 0.65};
  }
`;

export const _step = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
`;

export const _select = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const _input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  height: 48px;
  min-width: 72px;
  width: 96px;
  border-radius: 8px;
  background: #1F1F20;
  > input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 100%;
    padding: 0 12px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    background: transparent;
    border: none;
    &:active {
      border: none;
    }
    &:focus {
      border: none;
    }
    &::placeholder {
      color: rgba(255,255,255,0.65);
    }
  }
`;

export const _add = styled.div`
  min-width: 48px;
  width: 48px;
  min-height: 48px;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  font-size: 20px;
  font-weight: 700;
  transition: transform 0.1s ease-out;
  &::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _reduce = styled.div`
  min-width: 48px;
  width: 48px;
  min-height: 48px;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  font-size: 20px;
  font-weight: 700;
  transition: transform 0.1s ease-out;
  &::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _buy = styled.div`
  min-width: 204px;
  padding: 16px 32px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  transition: transform 0.1s ease-out;
	opacity: ${({ $disabled }) => $disabled ? 0.15 : 1};
  pointer-events: ${({ $disabled }) => $disabled ? 'none' : 'all'};
	&::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _timer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 208px;
  gap: 6px;
  margin-top: 20px;
  margin-bottom: ${({ $first }) => $first ? '0' : '20px'};
`;

export const _countdown = styled.div`
  min-height: 80px;
  height: 80px;
  min-width: 64px;
  width: 64px;
  background: #1F1F20;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
`;

export const _number = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
`;

export const _period = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.25px;
`;

export const _tickets = styled.div`
  padding: 20px 0 0 0;
  color: #BA8BFF;
`;

export const _share = styled.div`
  min-width: 204px;
  padding: 16px 32px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _intermission = styled.div`
  
`;

export const _pause = styled.div`
  min-width: 208px;
  width: 208px;
  padding: 12px;
  border-radius: 8px;
  background: #1F1F2088;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.35);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
`;

export const _results = styled.div`
  padding: 20px 0 0 0;
  color: #BA8BFF;
`;

export const _rewards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const _nft = styled.div`
  min-width: 64px;
  width: 64px;
  min-height: 64px;
  height: 64px;
  padding: 12px;
  border-radius: 8px;
  background: #1F1F2088;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.35);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _sol = styled.div`
  min-width: 64px;
  width: 64px;
  min-height: 64px;
  height: 64px;
  padding: 12px;
  border-radius: 8px;
  background: #1F1F2088;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.35);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _claim = styled.div`
  min-width: 204px;
  padding: 16px 32px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _nav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 64px;
  height: 64px;
  background: #171717;
  box-shadow: 0 -1px 32px -2px #171717;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  gap: 32px;
  border-top: 1px solid rgba(255,255,255,0.08);
`;

export const _prev = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  height: 48px;
  min-width: 120px;
  width: 120px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.25px;
  padding: 0 12px;
  opacity: ${({ $active }) => $active ? 1 : 0.15};
  pointer-events: ${({ $active }) => $active ? 'all' : 'none'};
  transition: transform 0.1s ease-out;
  &::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _current = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  height: 48px;
  min-width: 80px;
  width: 80px;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  padding: 0 12px;
  > b {
    color: rgba(255,255,255,0.35);
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.25px;
  }
  > span {
    color: rgba(255,255,255,0.35);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.25px;
  }
`;

export const _next = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  height: 48px;
  min-width: 120px;
  width: 120px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.25px;
  padding: 0 12px;
  opacity: ${({ $active }) => $active ? 1 : 0.15};
  pointer-events: ${({ $active }) => $active ? 'all' : 'none'};
  transition: transform 0.1s ease-out;
  &::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _padding = styled.div`
  width: 100%;
  min-height: 800px;
  height: 800px;
`;

export const _success = styled.div`
  border-radius: 8px;
  background: #1F1F2088;
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.35);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
  padding: 32px;
`;

export const _connect = styled.div`
  min-width: 204px;
  padding: 16px 32px;
  border-radius: 8px;
  background: #1F1F20;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  &::selection {
    background: transparent;
  }
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _disconnect = styled.div`
  color: #BA8BFF;
  font-style: italic;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  padding: 8px 16px;
  transition: transform 0.1s ease-out;
  opacity: ${({ $active }) => $active ? 1 : 0.15};
  pointer-events: ${({ $active }) => $active ? 'all' : 'none'};
  &::selection {
    background: transparent;
  }
  &:hover {
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const _max = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  padding: 8px 16px;
  transition: transform 0.1s ease-out;
  opacity: 0.8;
  pointer-events: none;
  &::selection {
    background: transparent;
  }
`;

export const _error = styled.div`
  color: #ff8a8a;
  font-weight: 400;
  font-size: 12px;
  padding: 8px 16px;
  transition: transform 0.1s ease-out;
  opacity: 0.8;
  pointer-events: none;
  &::selection {
    background: transparent;
  }
`;

export const _username = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 4px;
`;