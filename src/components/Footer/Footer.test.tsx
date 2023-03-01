import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('Team Name', () => {
    render(<Footer />);
    const teamName = screen.getByText('Team Plan B')
    expect(teamName).toBeInTheDocument();
  })

  it('Link to repositories', () => {
    render(<Footer />);
    const repositoriesLinks = screen.getAllByRole('link')
    const konstantinRep = repositoriesLinks[0]
    const alexRep = repositoriesLinks[1]
    const georgeRep = repositoriesLinks[2]
    expect(konstantinRep).toHaveAttribute('href', 'https://github.com/L4vrin');
    expect(alexRep).toHaveAttribute('href', 'https://github.com/aleksryab');
    expect(georgeRep).toHaveAttribute('href', 'https://github.com/MaDKnighT404');
  })

  it('Link to RSShool', () => {
    render(<Footer />);
    const rsSchool = screen.getByRole('link', {name: /RSSchool/i})
    expect(rsSchool).toHaveAttribute('href', 'https://rs.school/js/');
  })
})