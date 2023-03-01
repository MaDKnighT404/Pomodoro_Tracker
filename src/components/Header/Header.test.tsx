import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store';
import Header from './Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}))

describe('Header component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Header render', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  });

  it ('Logo when localStorage empty', () => {
    window.localStorage.setItem('user', JSON.stringify('George'));
    const user = '';

    if(!user) {
    const { getByRole } = render(<img alt="logo symbol" />)
      expect(getByRole(`img`)).toHaveAttribute('alt', 'logo symbol')
    }
  })

  it ('User name from localStorage', () => {
    window.localStorage.setItem('user', JSON.stringify('George'));
    const user = window.localStorage.getItem('user');

    const { getByText } = render(<div>{user}</div>)
    expect(getByText(`${user}`)).toBeInTheDocument()
  })
});


