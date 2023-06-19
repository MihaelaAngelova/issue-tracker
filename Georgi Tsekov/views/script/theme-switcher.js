const switchTheme = () => {
    const rootElement = document.documentElement;
    let dataTheme = rootElement.getAttribute('data-theme');
    let newTheme = (dataTheme === 'light') ? 'dark' : 'light';

    rootElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
}

document.querySelector('#theme-switcher').addEventListener('click', switchTheme);