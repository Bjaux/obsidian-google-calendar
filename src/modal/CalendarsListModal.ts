import type { GoogleCalendar } from "../helper/types";

import GoogleCalendarPlugin from "src/GoogleCalendarPlugin";
import { FuzzySuggestModal } from "obsidian";
import { googleListEventsByCalendar } from "../googleApi/GoogleListEvents";
import { EventListModal } from "./EventListModal";

/**
 * This class is used to diplay a select modal in which the user can select a calendar to see its events
 */
export class CalendarsListModal extends FuzzySuggestModal<GoogleCalendar> {
	calendarList: GoogleCalendar[];

	constructor(calendarList: GoogleCalendar[]) {
		super(GoogleCalendarPlugin.getInstance().app);
		this.calendarList = calendarList;
		this.setPlaceholder("Select a calendar to view it");
	}

	getItems(): GoogleCalendar[] {
		return this.calendarList;
	}

	getItemText(item: GoogleCalendar): string {
		return `${item.summary}\t`;
	}

	async onChooseItem(
		item: GoogleCalendar
	): Promise<void> {
		const events = await googleListEventsByCalendar(item);
		new EventListModal(events).open();
	}
}
