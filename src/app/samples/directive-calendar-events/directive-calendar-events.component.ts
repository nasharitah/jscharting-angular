import {AfterViewInit, Component, OnInit} from '@angular/core';

const defaultConfig: any = {
	debug: true,
	type: 'calendar month solid',
	title: {
		position: 'full',
		boxVisible: true,
		shadow: false,
		outline: 'none',
		fill: 'none',
		margin_bottom: 15,
		label: {
			text: 'July 2018',
			style: {
				fontSize: 20,
				fontFamily: 'Arial',
				fontWeight: 'bold',
				color: '#0b7285'
			}
		}
	},
	defaultBox_boxVisible: false,
	yAxis_visible: false,
	legend_visible: false,
	calendar: {
		range: ['7/1/2018', '7/31/2018'],
		defaultEdgePoint: {color: 'white', label_color: '#83b2b7', mouseTracking: false}
	},
	defaultSeries: {
		shape_innerPadding: 0,
		defaultPoint: {
			tooltip_enabled: false,
			states_hover: {color: '#e3fafc'},
			label: {
				text: '<span style="align:right; font-size:14px;"><b>%name</b></span><br>%events',
				align: 'left',
				verticalAlign: 'top',
				padding: 3,
				style: {
					fontWeight: 'bold',
					color: '#1098ad',
					fontFamily: 'Arial'
				}
			},
			attributes_events: ''
		}
	}
};

@Component({
	selector: 'app-directive-calendar-events',
	templateUrl: './directive-calendar-events.component.html',
	styleUrls: ['./directive-calendar-events.component.css']
})
export class DirectiveCalendarEventsComponent implements AfterViewInit, OnInit {
	chartOptions: any;

	ngOnInit(): void {
		this.chartOptions = {};
	}

	ngAfterViewInit(): void {
		fetch('./assets/events_data.csv')
			.then((response) => {
				return response.text();
			})
			.then((text) => {
				const data = window['JSC'].parseCsv(text).data;
				this.chartOptions = Object.assign(defaultConfig, {
					series: [{
						points: data.map(function (row) {
							const labelText =
								`<br>
<span style="color:#78909c;font-size:12px; font-weight:normal">${row[2]}</span>
<br>
<span style="font-size:8px; font-weight:normal; color:#b0bec5;">
${window['JSC'].formatDate(new Date(row[0]), 't')} - ${window['JSC'].formatDate(new Date(row[1]), 't')}
</span>`;
							return {
								date: [
									row[0],
									row[1]
								],
								attributes: {
									events: [labelText]
								}
							};
						})
					}]
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
}
