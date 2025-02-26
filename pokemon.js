import Game from "./main.js";

class Selectors {
    constructor(name) {
        this.elName = document.getElementById(`name-${name}`);
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({
        name,
        hp,
        type,
        selector,
        attacks = [],
        img,
        id
    }) {
        super(selector);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;
        this.id = id;

        this.renderHP();
        this.renderPokemon();
    }

    renderPokemon = () => {
        const {
            name,
            elName,
            img,
            elImg
        } = this;
        elName.innerText = name;
        elImg.src = img;
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(this.name + ' lose!');
            const newGame = new Game();
            newGame.reset();
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

        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        } else {
            elProgressbar.classList.remove('critical');
            elProgressbar.classList.remove('low');
        }
        
        elProgressbar.style.width = percent + '%';
    }
}

export default Pokemon;