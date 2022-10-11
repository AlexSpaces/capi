const getPositions = (el) => {
    return { x: parseFloat(el.style.left.replace('px', '')), y: parseFloat(el.style.top.replace('px', '')) };
};

export default (el, binding) => {
    const { step, x, y } = (binding.value || {});

    el.style.position = 'absolute';
    el.setAttribute('draggable', true);

    const gridSpacing = step || 10;
    const offset = { x: 0, y: 0 };
    let move = false;

    if (!el.style.left) {
        el.style.left = `${x || 0}px`;
    }

    if (!el.style.top) {
        el.style.top = `${y || 0}px`;
    }

    el.addEventListener('dragstart', event => {
        event.preventDefault();
    });

    el.addEventListener('mousedown', event => {
        const { x, y } = getPositions(el);

        offset.x = event.clientX - x;
        offset.y = event.clientY - y;

        move = true;
        el.classList.add('moving');
    });

    el.addEventListener('mousemove', event => {
        event.preventDefault();

        if (!move) {
            return;
        }

        const mouse = { x: event.clientX, y: event.clientY };
        const x = Math.round((mouse.x - offset.x) / gridSpacing);
        const y = Math.round((mouse.y - offset.y) / gridSpacing);

        el.style.left = `${x * gridSpacing}px`;
        el.style.top = `${y * gridSpacing}px`;
    });

    el.addEventListener('mouseup', () => {
        move = false;
        el.classList.remove('moving');
    });

    el.addEventListener('mouseleave', () => {
        move = false;
        el.classList.remove('moving');
    });
};
