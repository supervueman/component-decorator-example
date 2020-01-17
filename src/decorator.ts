interface ComponentDecorator {
	selector: string;
	template: string;
}

function Component(config: ComponentDecorator) {
	return function <T extends { new(...args: any[]): object }>(Constructor: T) {
		return class extends Constructor {
			constructor(...args: any[]) {
				super(...args)
				const el = document.querySelector(config.selector);

				if (el) {
					el.innerHTML = config.template;
				}
			}
		}
	}
}

function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
	const original = descriptor.value;

	return {
		configurable: true,
		enumerable: false,
		get() {
			return original.bind(this);
		}
	}
}

@Component({
	selector: '#card',
	template: `
		<div class="card">
			<div class="card-content">
				<span class="card-title">{{name}}</span>
			</div>
		</div>
	`
})
class CardComponent {
	constructor(public name: string) {
	}

	@Bind
	logName(): void {
		console.log(`Component name: ${this.name}`);
	}
}

const card = new CardComponent('My card component');

const btn = document.querySelector('#btn')!;

btn.addEventListener('click', card.logName);
