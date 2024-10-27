{{- $currentColor := dbGet .User.ID "color-role-id" }}

{{- if $currentColor }}
	{{- removeRoleID $currentColor.Value 0 }}
{{- end }}

{{- $role := getRoleID (index .InteractionData.Values 0) }}

{{- dbSet .User.ID "color-role-id" (str $role.ID) }}

{{- addRoleID $role.ID }}

{{- ephemeralResponse -}}

You now have the **<@&{{ $role.ID }}>** color!