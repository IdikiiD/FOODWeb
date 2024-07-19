function cards(){
    class MenuTab {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 17.80;
            this.changeToMDL();
        }

        changeToMDL() {
            this.price = this.price / this.transfer
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
        <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price.toFixed(2)}</span> $/день</div>
                </div>
            </div>
        `;
            this.parent.append(element);
        }


    }

    const getResourse = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status${res.status}`);
        }

        return await res.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuTab(img, altimg, title, descr, price, '.menu .container').render();
            })
        });
}
export default cards;