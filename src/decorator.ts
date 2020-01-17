interface ComponentDecorator {
	selector: string;
	template: string;
}

function Component(config: ComponentDecorator) {
	return function (Constructor: Function) {

	}
}

@Component({
	selector: '#card',
	template: `
		<div class="card">
			<div class="card-content">
				<span class="card-title">Card component</span>
			</div>
		</div>
	`
})
class CardComponent {
	constructor(public name: string) {
	}

	logName(): void {
		console.log(`Component name: ${this.name}`);
	}
}
