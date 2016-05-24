function buildWorkLog(timers) {
	var worklog = ''
	for (t in timers) {
		worklog += timers[t].pause_date() + ': ' + timers[t].name() + ' ' + timers[t].formatted_time() + '\n'
	}
	return worklog
}

function saveWorkLog(worklog) {
	finder = Application("Finder")
	finder.includeStandardAdditions = true
	const pathToSave = finder.chooseFileName({defaultName: 'worklog.txt'})
	ObjC.import('Cocoa');
	str = $.NSString.alloc.initWithUTF8String(worklog);
	str.writeToFileAtomically(pathToSave.toString(), true);
}

function deleteTimers(timers) {
	const ids = timers.id()
	for (i in ids) {
		id = ids[i]
		timers.byId(id).delete_timer()
	}
}

const app = Application("BillingTimer")

const timers = app.timers

saveWorkLog(buildWorkLog(timers))
deleteTimers(timers)
