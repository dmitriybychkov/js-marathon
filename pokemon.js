class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({
        name,
        hp,
        type,
        selector
    }) {
        super(selector);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp
        };
        this.type = type;
        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();
        cb && cb(count);
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const {
            hp: {
                current,
                total
            },
            elHP
        } = this;
        elHP.innerText = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const {
            elProgressbar,
            hp: {
                current,
                total
            }
        } = this;
        const percent = current / (total / 100);
        elProgressbar.style.width = percent + '%';
    }
}

export default Pokemon;