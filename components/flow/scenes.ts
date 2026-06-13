export const flowScenes = [
  ["invoice", "01", "Aus Ihrem bestehenden System", "Ihre Rechnung ist fertig. Ab jetzt übernimmt 0Admin.", "Die Rechnung wurde wie gewohnt in Ihrer bestehenden Software erstellt. 0Admin übernimmt anschließend die relevanten Daten und hält den weiteren Geldfluss im Blick."],
  ["email", "02", "Versand", "Die Rechnung wird zum E-Mail-Anhang.", "Dasselbe Blatt verkleinert sich und gleitet in die Nachricht."],
  ["inbox", "03", "Eingang in 0Admin", "Die Rechnung kommt im System an.", "0Admin erkennt und scannt das Dokument sichtbar."],
  ["extract", "04", "Datenextraktion", "Die relevanten Werte verlassen das Blatt.", "Rechnungsnummer, Kunde, Fristen und Beträge fliegen in die Datenablage."],
  ["due", "05", "Frist", "Der Vorgang verändert seinen Zustand.", "Der Status entwickelt sich mit dem Scrollfortschritt."],
  ["reminder", "06", "Vorbereitung", "0Admin bereitet den nächsten Schritt vor.", "Die Zahlungserinnerung schiebt sich hinter dem Blatt hervor und bleibt bis zur Freigabe unter Ihrer Kontrolle."],
] as const;
