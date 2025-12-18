import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_a4e068745e639ef3c77e64b53cd1d03d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_d6f64525df6e387fc6b4c8820f205c6d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.refresh_customers", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_d6f64525df6e387fc6b4c8820f205c6d,variant:"outline"},"Refresh")
  )
}


function Button_b84c98926a74056912ea58dc75cde294 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_76f28f5212d7f8452bf9dab7532cd2d4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_76f28f5212d7f8452bf9dab7532cd2d4},"Add Customer")
  )
}


function Callout__text_8c22e0286b428131afda49a8c11845ef () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___customers____customer_state.error_message_rx_state_)
  )
}


function Fragment_7b4d0901bc46e2105178b320eb9804f3 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___customers____customer_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_8c22e0286b428131afda49a8c11845ef,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_2476cd9c0c87fd58f505590b6a2f5749 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___customers____customer_state.success_message_rx_state_)
  )
}


function Fragment_e8cf52e5ec8c440ca267a97e72e41ef7 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___customers____customer_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_2476cd9c0c87fd58f505590b6a2f5749,{},)))):(jsx(Fragment,{},))))
  )
}


function Heading_57ada455f6affb03bb674cdf064659b6 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(RadixThemesHeading,{size:"6"},((reflex___state____state__state____global_state__pages___customers____customer_state.editing_id_rx_state_ > 0) ? "Edit Customer" : "Add New Customer"))
  )
}


function Debounceinput_6e4219be3fea8f2fa5d142f658473773 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_7113780871af9275d3e5e3ac03f94021 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_7113780871af9275d3e5e3ac03f94021,placeholder:"Customer Name *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_name_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_name_rx_state_ : "")},)
  )
}


function Debounceinput_5418055fdfba34b9703479918044e4eb () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_6bf83a44aa54bb30b15eee3cad9233ec = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_gstin", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_6bf83a44aa54bb30b15eee3cad9233ec,placeholder:"GSTIN (optional)",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_gstin_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_gstin_rx_state_ : "")},)
  )
}


function Debounceinput_6b3424b056a72cdb40dcccb78b6fc617 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_941ef4b3bd568c0d567c5f1942f27057 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_address", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_941ef4b3bd568c0d567c5f1942f27057,placeholder:"Address",value:reflex___state____state__state____global_state__pages___customers____customer_state.form_address_rx_state_},)
  )
}


function Debounceinput_8f050419fd8e4046bcd347ca5201c225 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_78844bb8612a32577c162449d8f799d0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_city", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_78844bb8612a32577c162449d8f799d0,placeholder:"City",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_city_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_city_rx_state_ : "")},)
  )
}


function Debounceinput_e50d294964e76f52168acc6db4a83427 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_801bcdcc999db4e55d51fb62cfd03270 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_state", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_801bcdcc999db4e55d51fb62cfd03270,placeholder:"State",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_state_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_state_rx_state_ : "")},)
  )
}


function Debounceinput_9b8bc09d0fa559eb1c6a242313d01ce7 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_df4f5f16a6a1c982df998b4c9e108c54 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_pincode", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_df4f5f16a6a1c982df998b4c9e108c54,placeholder:"Pincode",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_pincode_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_pincode_rx_state_ : "")},)
  )
}


function Debounceinput_a9a5f8799f0f16416f06b33dbc97f714 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_bb0a335e9195ecad3d1e7c4d1a558ff2 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_phone", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_bb0a335e9195ecad3d1e7c4d1a558ff2,placeholder:"Phone",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_phone_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_phone_rx_state_ : "")},)
  )
}


function Debounceinput_62130de6dd2a51fce20e87d4fe37b919 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_82bd2deade950c6f63ed50ed273ba6f8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_form_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_82bd2deade950c6f63ed50ed273ba6f8,placeholder:"Email",type:"email",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___customers____customer_state.form_email_rx_state_) ? reflex___state____state__state____global_state__pages___customers____customer_state.form_email_rx_state_ : "")},)
  )
}


function Button_97f9405f574ee9af319a1e4864130489 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_09dcb72ed3a725979a7409a51d83c631 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_09dcb72ed3a725979a7409a51d83c631,variant:"outline"},"Cancel")
  )
}


function Button_c856032daf2782d488522b208955876e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_b61161248b4ebf043b5ac94daee4c740 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.save_customer", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_b61161248b4ebf043b5ac94daee4c740},"Save")
  )
}


function Fragment_2052eaddf634ff861967c59cf8005423 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___customers____customer_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(Heading_57ada455f6affb03bb674cdf064659b6,{},),jsx(Debounceinput_6e4219be3fea8f2fa5d142f658473773,{},),jsx(Debounceinput_5418055fdfba34b9703479918044e4eb,{},),jsx(Debounceinput_6b3424b056a72cdb40dcccb78b6fc617,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_8f050419fd8e4046bcd347ca5201c225,{},),jsx(Debounceinput_e50d294964e76f52168acc6db4a83427,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_9b8bc09d0fa559eb1c6a242313d01ce7,{},),jsx(Debounceinput_a9a5f8799f0f16416f06b33dbc97f714,{},)),jsx(Debounceinput_62130de6dd2a51fce20e87d4fe37b919,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_97f9405f574ee9af319a1e4864130489,{},),jsx(Button_c856032daf2782d488522b208955876e,{},)))))):(jsx(Fragment,{},))))
  )
}


function Flex_aba82d0f66b4e07db2a0d6b0b5f45667 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},Array.prototype.map.call(reflex___state____state__state____global_state__pages___customers____customer_state.customer_indices_rx_state_ ?? [],((idx_rx_state_,index_6c2c25fe5432ce89aacfa0eaa9777e73)=>(jsx(RadixThemesBox,{css:({ ["width"] : "100%" }),key:index_6c2c25fe5432ce89aacfa0eaa9777e73},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "4", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "md" }),direction:"row",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"1"},jsx(RadixThemesText,{as:"p",size:"4",weight:"bold"},reflex___state____state__state____global_state__pages___customers____customer_state.customer_names_rx_state_?.at?.(idx_rx_state_)),jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___customers____customer_state.customer_gstins_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"2"},("GSTIN: "+reflex___state____state__state____global_state__pages___customers____customer_state.customer_gstins_rx_state_?.at?.(idx_rx_state_))))):(jsx(Fragment,{},)))),jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___customers____customer_state.customer_phones_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"2"},("Phone: "+reflex___state____state__state____global_state__pages___customers____customer_state.customer_phones_rx_state_?.at?.(idx_rx_state_))))):(jsx(Fragment,{},)))),jsx(Fragment,{},((reflex___state____state__state____global_state__pages___customers____customer_state.customer_outstanding_balances_rx_state_?.at?.(idx_rx_state_) > 0)?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "orange.600" }),weight:"bold"},("Outstanding: \u20b9 "+(reflex___state____state__state____global_state__pages___customers____customer_state.customer_outstanding_balances_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))))):(jsx(Fragment,{},))))),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_selected_customer_id", ({ ["customer_id"] : reflex___state____state__state____global_state__pages___customers____customer_state.customer_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.open_edit_form", ({ ["customer_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"2",variant:"outline"},"Edit"),jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.set_selected_customer_id", ({ ["customer_id"] : reflex___state____state__state____global_state__pages___customers____customer_state.customer_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___customers____customer_state.delete_customer", ({ ["customer_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"2",variant:"outline"},"Delete"))))))))
  )
}


function Fragment_a24dcf7b93e2a06753adbc3b059d52f1 () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___customers____customer_state.customer_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Flex_aba82d0f66b4e07db2a0d6b0b5f45667,{},))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No customers found. Click 'Add Customer' to create one.")))))
  )
}


function Fragment_8f2fac05ce286e1e14a8c209a4c7e1ca () {
  const reflex___state____state__state____global_state__pages___customers____customer_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___customers____customer_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_a24dcf7b93e2a06753adbc3b059d52f1,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Customers"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_a4e068745e639ef3c77e64b53cd1d03d,{},),jsx(Button_b84c98926a74056912ea58dc75cde294,{},))),jsx(Fragment_7b4d0901bc46e2105178b320eb9804f3,{},),jsx(Fragment_e8cf52e5ec8c440ca267a97e72e41ef7,{},),jsx(Fragment_2052eaddf634ff861967c59cf8005423,{},),jsx(Fragment_8f2fac05ce286e1e14a8c209a4c7e1ca,{},)))),jsx("title",{},"Customers - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}