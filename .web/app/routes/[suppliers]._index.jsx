import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_c107b9e2e3af28e91e5de6b6d46441a7 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_dc13c78ee967db7c99f009f3b616bf82 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.refresh_suppliers", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_dc13c78ee967db7c99f009f3b616bf82,variant:"outline"},"Refresh")
  )
}


function Button_0dc0d9f2f8b86240e9e92112d10cca4c () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_09fea8b2da180cde4fe8b9ce15bae721 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_09fea8b2da180cde4fe8b9ce15bae721},"Add Supplier")
  )
}


function Callout__text_ff0596c861ecfaefd7edb5d5c10ff490 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___suppliers____supplier_state.error_message_rx_state_)
  )
}


function Fragment_7b062885b4d82f285d94eb5400984039 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___suppliers____supplier_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_ff0596c861ecfaefd7edb5d5c10ff490,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_67cfdf54c5b2e62fe6b252f94d7efa71 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___suppliers____supplier_state.success_message_rx_state_)
  )
}


function Fragment_79791461427012e091207be6b7c3591c () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___suppliers____supplier_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_67cfdf54c5b2e62fe6b252f94d7efa71,{},)))):(jsx(Fragment,{},))))
  )
}


function Heading_ab730a36d50ef4df504f51dcfd0db44c () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(RadixThemesHeading,{size:"6"},((reflex___state____state__state____global_state__pages___suppliers____supplier_state.editing_id_rx_state_ > 0) ? "Edit Supplier" : "Add New Supplier"))
  )
}


function Debounceinput_418a807a6a93a30e1a63377fabd2d245 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_b6a451e92764ef2dbd100897e947c635 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_b6a451e92764ef2dbd100897e947c635,placeholder:"Supplier Name *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_name_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_name_rx_state_ : "")},)
  )
}


function Debounceinput_051ec77b0cd976c785f05fdc6726de2c () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0ab23d9335e8a7e1d9ef596bfce5e368 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_gstin", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0ab23d9335e8a7e1d9ef596bfce5e368,placeholder:"GSTIN (optional)",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_gstin_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_gstin_rx_state_ : "")},)
  )
}


function Debounceinput_0f6594e0d21ed6edd1027180468dd327 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_52284bbfdb6dd6a98f78f310cd2509f1 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_address", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_52284bbfdb6dd6a98f78f310cd2509f1,placeholder:"Address",value:reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_address_rx_state_},)
  )
}


function Debounceinput_0909c9a5fad840b917c623a98d0c1f4f () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_23a53d3444d2203fc822c6c1b5070751 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_city", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_23a53d3444d2203fc822c6c1b5070751,placeholder:"City",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_city_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_city_rx_state_ : "")},)
  )
}


function Debounceinput_30b80a040f19b898d63e3f7cdef6ebd2 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_9a5fe8e951c359fd60490ba5a2985416 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_state", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_9a5fe8e951c359fd60490ba5a2985416,placeholder:"State",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_state_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_state_rx_state_ : "")},)
  )
}


function Debounceinput_cddc37fc9da20a8b614153e0a6e823f5 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_c2f2208f1f44c7b911be8b7035580561 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_pincode", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_c2f2208f1f44c7b911be8b7035580561,placeholder:"Pincode",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_pincode_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_pincode_rx_state_ : "")},)
  )
}


function Debounceinput_85365b70f99377678fc0513083b46da2 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f61805f24591dddb66965c8a451531f4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_phone", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_f61805f24591dddb66965c8a451531f4,placeholder:"Phone",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_phone_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_phone_rx_state_ : "")},)
  )
}


function Debounceinput_585e24b7cd5979e28e7ef5d5f13ec725 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_a4ad5f0b7515bc8a614da04b8426274f = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_form_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_a4ad5f0b7515bc8a614da04b8426274f,placeholder:"Email",type:"email",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_email_rx_state_) ? reflex___state____state__state____global_state__pages___suppliers____supplier_state.form_email_rx_state_ : "")},)
  )
}


function Button_b4d4887704d224bca0eafbc5e68b093c () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_3af392242b912520027055b7cd72223b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_3af392242b912520027055b7cd72223b,variant:"outline"},"Cancel")
  )
}


function Button_31e6b5d4854347f3f87a75775fe428f8 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_dd55bcae0754657bb33a88daf42db546 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.save_supplier", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_dd55bcae0754657bb33a88daf42db546},"Save")
  )
}


function Fragment_0a3d25ccf089212cdc111238d75d0546 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___suppliers____supplier_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(Heading_ab730a36d50ef4df504f51dcfd0db44c,{},),jsx(Debounceinput_418a807a6a93a30e1a63377fabd2d245,{},),jsx(Debounceinput_051ec77b0cd976c785f05fdc6726de2c,{},),jsx(Debounceinput_0f6594e0d21ed6edd1027180468dd327,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_0909c9a5fad840b917c623a98d0c1f4f,{},),jsx(Debounceinput_30b80a040f19b898d63e3f7cdef6ebd2,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_cddc37fc9da20a8b614153e0a6e823f5,{},),jsx(Debounceinput_85365b70f99377678fc0513083b46da2,{},)),jsx(Debounceinput_585e24b7cd5979e28e7ef5d5f13ec725,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_b4d4887704d224bca0eafbc5e68b093c,{},),jsx(Button_31e6b5d4854347f3f87a75775fe428f8,{},)))))):(jsx(Fragment,{},))))
  )
}


function Flex_439bfdce0ca5da7c323427d4d4204327 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},Array.prototype.map.call(reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_indices_rx_state_ ?? [],((idx_rx_state_,index_6c2c25fe5432ce89aacfa0eaa9777e73)=>(jsx(RadixThemesBox,{css:({ ["width"] : "100%" }),key:index_6c2c25fe5432ce89aacfa0eaa9777e73},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "4", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "md" }),direction:"row",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"1"},jsx(RadixThemesText,{as:"p",size:"4",weight:"bold"},reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_names_rx_state_?.at?.(idx_rx_state_)),jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_gstins_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"2"},("GSTIN: "+reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_gstins_rx_state_?.at?.(idx_rx_state_))))):(jsx(Fragment,{},)))),jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_phones_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"2"},("Phone: "+reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_phones_rx_state_?.at?.(idx_rx_state_))))):(jsx(Fragment,{},)))),jsx(Fragment,{},((reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_outstanding_balances_rx_state_?.at?.(idx_rx_state_) > 0)?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "red.600" }),weight:"bold"},("Outstanding: \u20b9 "+(reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_outstanding_balances_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))))):(jsx(Fragment,{},))))),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_selected_supplier_id", ({ ["supplier_id"] : reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.open_edit_form", ({ ["supplier_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"2",variant:"outline"},"Edit"),jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.set_selected_supplier_id", ({ ["supplier_id"] : reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___suppliers____supplier_state.delete_supplier", ({ ["supplier_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"2",variant:"outline"},"Delete"))))))))
  )
}


function Fragment_ac97363e78d90342c3b88dcc29551dd2 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___suppliers____supplier_state.supplier_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(Flex_439bfdce0ca5da7c323427d4d4204327,{},))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No suppliers found. Click 'Add Supplier' to create one.")))))
  )
}


function Fragment_7eb002fbd337c9c16bf3287911e11fe3 () {
  const reflex___state____state__state____global_state__pages___suppliers____supplier_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___suppliers____supplier_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_ac97363e78d90342c3b88dcc29551dd2,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Suppliers"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_c107b9e2e3af28e91e5de6b6d46441a7,{},),jsx(Button_0dc0d9f2f8b86240e9e92112d10cca4c,{},))),jsx(Fragment_7b062885b4d82f285d94eb5400984039,{},),jsx(Fragment_79791461427012e091207be6b7c3591c,{},),jsx(Fragment_0a3d25ccf089212cdc111238d75d0546,{},),jsx(Fragment_7eb002fbd337c9c16bf3287911e11fe3,{},)))),jsx("title",{},"Suppliers - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}