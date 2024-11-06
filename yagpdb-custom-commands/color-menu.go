{{ $colorChannelID := (color channel id) }}

{{- $bright := cslice
	(bright red role id)
	(bright orange role id)
	(bright yellow role id)
	(bright green role id)
	(bright teal role id)
	(bright cyan role id)
	(bright blue role id)
	(bright violet role id)
	(bright magenta role id)
	(bright pink role id)
}}

{{- $deep := cslice
	(deep red role id)
	(deep orange role id)
	(deep yellow role id)
	(deep green role id)
	(deep teal role id)
	(deep cyan role id)
	(deep blue role id)
	(deep violet role id)
	(deep magenta role id)
	(deep pink role id)
}}

{{- $muted := cslice
	(muted red role id)
	(muted orange role id)
	(muted yellow role id)
	(muted green role id)
	(muted teal role id)
	(muted cyan role id)
	(muted blue role id)
	(muted violet role id)
	(muted magenta role id)
	(muted pink role id)
}}

{{- $pastel := cslice
	(pastel red role id)
	(pastel orange role id)
	(pastel yellow role id)
	(pastel green role id)
	(pastel teal role id)
	(pastel cyan role id)
	(pastel blue role id)
	(pastel violet role id)
	(pastel magenta role id)
	(pastel pink role id)
}}

{{- $grayscale := cslice
	(white role id)
	(gray 8 role id)
	(gray 7 role id)
	(gray 6 role id)
	(gray 5 role id)
	(gray 4 role id)
	(gray 3 role id)
	(gray 2 role id)
	(gray 1 role id)
	(black role id)
}}

{{- $colorGroups := cslice $bright $deep $muted $pastel $grayscale }}

{{- $yagID := 204255221017214977 }}

{{- $oldMessage := dbGet $yagID "color-menu-message" }}

{{- if $oldMessage }}
	{{- deleteMessage $colorChannelID $oldMessage.Value 0 }}
{{- end }}

{{- $emojis := dict 0 "1️⃣" 1 "2️⃣" 2 "3️⃣" 3 "4️⃣" 4 "5️⃣" 5 "6️⃣" 6 "7️⃣" 7 "8️⃣" 8 "9️⃣" 9 "🔟" }}

{{- range $index, $group := $colorGroups }}
	{{- range $index2, $roleID := $group }}
		{{- $role := getRoleID $roleID }}
		{{- $group.Set $index2 (sdict "label" $role.Name "value" (str $roleID) "emoji" (sdict "name" ($emojis.Get $index2))) }}
	{{- end }}
{{- end }}

{{- $message := complexMessage
	"content" "https://brybrant.github.io/role-colors/"
	"menus" (cslice
		(cmenu "type" "text" "placeholder" "Select a color (Row 1: Bright)" "custom_id" "color-menu-1" "options" $bright)
		(cmenu "type" "text" "placeholder" "Select a color (Row 2: Deep)" "custom_id" "color-menu-2" "options" $deep)
		(cmenu "type" "text" "placeholder" "Select a color (Row 3: Muted)" "custom_id" "color-menu-3" "options" $muted)
		(cmenu "type" "text" "placeholder" "Select a color (Row 4: Pastel)" "custom_id" "color-menu-4" "options" $pastel)
		(cmenu "type" "text" "placeholder" "Select a color (Row 5: Grayscale)" "custom_id" "color-menu-5" "options" $grayscale)
	)
}}

{{- dbSet $yagID "color-menu-message" (str (sendMessageRetID $colorChannelID $message)) }}